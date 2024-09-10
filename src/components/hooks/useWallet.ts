import { useEffect, useState } from "react"
import { getBalance } from "../../network/ethereum"

export const useWallet = () => {
  const { ethereum } = window
  const [currentAccount, setCurrentAccount] = useState<string | null>(ethereum.selectedAccount)
  const [balance, setBalance] = useState('0')

  // @ts-ignore
  ethereum.on("accountChanged", ([newAccount]) => {
    console.log("accountChanged: ", newAccount)
    setCurrentAccount(newAccount)
  })

  useEffect(() => {
    if (currentAccount) {
      const fetchBalance = async () => {
        const balance = await getBalance(currentAccount!!)
        setBalance(balance)
      }

      fetchBalance()
    }
  }, [currentAccount])

  return { currentAccount, setCurrentAccount, balance, setBalance }
}
