import { ethers } from "ethers";
import { useEffect, useState } from "react";
const { ethereum } = window;

export function Balance() {
  const [cuenta, setCuenta] = useState(null);
  const [balance, setBalance] = useState(null);
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

  if (!ethereum) {
    return <div>No hay metamask</div>;
  }
  return (
    <div>
      <p>{cuenta ? cuenta : "Cargando cuenta..."}</p>

      <p>{balance ? balance : "Cargando balance..."}</p>
    </div>
  );
}
