import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFan } from "@fortawesome/free-solid-svg-icons"


export default function Spinner({contentIsLoading}) {
    return (
        // <section className="fixed inset-0 text-white bg-black bg-opacity-80 grid place-items-center z-30">
            <div className="animate-spin absolute bottom-32 left-36 ">
                <FontAwesomeIcon icon={faFan} className="text-2xl" />
            </div>

        // </section>
    )
}