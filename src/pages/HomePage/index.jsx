import { Footer } from "../../components/Footer"
import { Header } from "../../components/Header"

export const HomePage = () => {

    const userName = JSON.parse(localStorage.getItem('user'))?.username;

    return (
        <>
            <Header name={userName} />
            <Footer />
        </>
    )
}