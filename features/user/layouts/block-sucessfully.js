import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function SucessfullyBlock({
    title,
    desc,
}) {
    return (
        <section className="w-full h-full flex p-5">
            <div className="w-full h-full flex flex-col justify-center items-center border-2 rounded-lg">
                <FontAwesomeIcon 
                    icon={faCheckCircle}
                    className="text-green text-9xl"
                />
                <h3 className="mt-6 text-green font-bold text-3xl">{title}</h3>
                <p className="mt-2 text-xl">{desc}</p>
            </div>
        </section>
    )
}