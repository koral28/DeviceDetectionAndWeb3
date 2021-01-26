import { useState } from "react";
import { useForm } from "react-hook-form";
import Web3 from "web3";
import { keccak256 } from "ethereum-cryptography/keccak";
import { HDKey } from "ethereum-cryptography/hdkey";

const CreateWeb3AccountComp = () => {
  const { register, handleSubmit, errors } = useForm();
  const [mnemonic, setMnemonic] = useState("");
  const [path, setPath] = useState("");
  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState("");
  const web3 = new Web3(
    new Web3.providers.HttpProvider(
      "https://mainnet.infura.io/v3/37aeb605ec92472cbda3970760bc8cc2"
    )
  );

  const Mnemonic = (e) => {
    setMnemonic(e.target.value);
  };
  const Path = (e) => {
    setPath(e.target.value);
  };

  const onSubmit = () => {
    const seed =
      "fffcf9f6f3f0edeae7e4e1dedbd8d5d2cfccc9c6c3c0bdbab7b4b1aeaba8a5a29f9c999693908d8a8784817e7b7875726f6c696663605d5a5754514e4b484542";
    const hdkey = HDKey.fromMasterSeed(Buffer.from(seed, "hex"));
    const childkey = hdkey.derive(path);
    const addressFromUser = childkey.privateExtendedKey;
    const privateKeyFromUser = keccak256(Buffer.from(mnemonic)).toString("hex");
    web3CreateAccount(privateKeyFromUser, addressFromUser);
  };

  const web3CreateAccount = (privateKeyFromUser, addressFromUser) => {
    const account = web3.eth.accounts.wallet.add({
      privateKey: privateKeyFromUser,
      address: addressFromUser,
    });

    console.log(addressFromUser);
    // console.log(account);
    // console.log(web3.eth.accounts.wallet[0].address);
    web3.eth.getBalance(web3.eth.accounts.wallet[0].address, function (
      err,
      result
    ) {
      if (err) {
        console.log(err);
      } else {
        setAddress(web3.eth.accounts.wallet[0].address);
        setBalance(web3.utils.fromWei(result, "ether") + " ETH");
      }
    });
  };

  return (
    <div className="container" style={{ padding: "50px", width: "50%" }}>
      <label style={{ fontSize: "25px", fontWeight: "bold", color: "white" }}>
        Create web3 Account
      </label>
      <br />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="input-field">
          <label style={{ fontWeight: "bold" }}>mnemonic</label>
          <input
            type="text"
            name="mnemonic"
            ref={register({
              required: "mnemonic is required!",
              minLength: { value: 2, message: "Too Short.." },
            })}
            onChange={Mnemonic}
          />
        </div>
        {errors.mnemonic && <h6>{errors.mnemonic.message}</h6>}
        <div className="input-field">
          <label style={{ fontWeight: "bold" }}>path</label>
          <input
            type="text"
            name="path"
            ref={register({
              required: "path is required!",
              minLength: { value: 2, message: "Too Short.." },
            })}
            onChange={Path}
          />
        </div>
        {errors.path && <h6>{errors.path.message}</h6>}
        <button
          className="waves-effect waves-light blue btn-small"
          type="submit"
        >
          Create
        </button>
        <br />
        <br />
        {address}
        <br />
        {balance}
      </form>
    </div>
  );
};

export default CreateWeb3AccountComp;
