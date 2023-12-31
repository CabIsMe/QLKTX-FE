import {landingPageUrl} from "../../utils/links" 
import Link from "next/link";
import {userURL} from "../../utils/links";

export default function Navigation() {
    return (
        <nav className="ml-20 w-full flex justify-between">
            <ul className="flex gap-12">
                {landingPageUrl.map(url => 
                    <li key={url.text}>
                        <Link href={url.href} className="capitalize cursor-pointer">
                            {url.text}
                        </Link>
                    </li>   
                )}
            </ul>
            <div className="flex gap-12">
                <Link href={userURL.login}>
                    Login
                </Link>
                <Link href={userURL.signup}>
                    Sign up                
                </Link>
            </div>
        </nav>
    )
}
