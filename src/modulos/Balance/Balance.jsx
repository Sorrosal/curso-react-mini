import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
const { ethereum } = window;

export function Balance() {
  const { register, handleSubmit } = useForm();
  const [cuenta, setCuenta] = useState(null);
  const [balance, setBalance] = useState(null);
  const [ok, setOk] = useState(null);
  const [ko, setKo] = useState(null);
  useEffect(() => {
    ethereum &&
      ethereum.request({ method: "eth_requestAccounts" }).then((cuenta) => {
        setCuenta(cuenta[0]);
        ethereum.on("accountsChanged", (i) => {
          setCuenta(i[0]);
        });
      });
  }, []);

  useEffect(() => {
    if (cuenta) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      provider.getBalance(cuenta).then((balance) => {
        setBalance(ethers.utils.formatEther(balance));
      });
    }
  }, [cuenta]);

  async function submit(data) {
    setKo(null);
    setOk(null);
    const parametros = {
      from: cuenta,
      to: data.address,
      value: ethers.utils.parseEther(data.amount).toHexString(),
    };
    try {
      const txHas = await ethereum.request({
        method: "eth_sendTransaction",
        params: [parametros],
      });
      setOk(txHas);
    } catch (error) {
      setKo("error en la transaccion", error.message);
    }
  }

  if (!ethereum) {
    return <div>No hay metamask</div>;
  }
  return (
    <div>
      <p>Cuenta:{cuenta ? cuenta : "Cargando cuenta..."}</p>

      <p>Saldo:{balance ? balance : "Cargando balance..."}</p>

      <form className="form-inline" onSubmit={handleSubmit(submit)}>
        <div className="form-group mb-3">
          <label htmlFor="address">Address</label>
          <input
            defaultValue="0x5cbC2f01077271a2c962D24f03F47a6B748E516A"
            id="address"
            className="form-control"
            {...register("address")}
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="amount">Amount</label>
          <input
            defaultValue={0.001}
            id="amount"
            className="form-control"
            {...register("amount")}
          />
        </div>
        <button type="submit" className="btn btn-primary mb-3">
          Send
        </button>
      </form>
      {ok && <div className="alert alert-info mt-3">{ok}</div>}
      {ko && <div className="alert alert-danger mt-3">{ko}</div>}
    </div>
  );
}
