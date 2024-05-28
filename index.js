const {
    Connection,
    PublicKey,
    clusterApiUrl,
    Keypair,
    LAMPORTS_PER_SOL
} = require("@solana/web3.js")

// This will create a new solana program everytime
const wallet = new Keypair()

const publicKey = new PublicKey(wallet._keypair.publicKey)
const secretKey = wallet._keypair.secretKey

console.log(publicKey)
console.log(secretKey)

const getWalletBalance = async() => {
    try {
        const connection = new Connection(clusterApiUrl('devnet'), 'confirmed')
        const walletBalance = await connection.getBalance(publicKey)
        console.log(`Wallet balance is ${walletBalance/LAMPORTS_PER_SOL} SOL`)
    } catch (err) {
        console.log(err)
    }
}

const airdropSol = async() => {
    try {
        const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
        const fromAirdropSignature = await connection.requestAirdrop(publicKey, 2 * LAMPORTS_PER_SOL)
        await connection.confirmTransaction(fromAirdropSignature)
    } catch(err) {
        console.log(err)
    }
}

const main = async() => {
    await getWalletBalance()
    await airdropSol()
    await getWalletBalance()
}

main()