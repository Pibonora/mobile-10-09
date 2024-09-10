// // import { UserInfo } from "firebase/auth"
// import { auth } from "../config/firebase"
// // usestate e usefect
// import { onAuthStateChanged } from "firebase/auth";
// //

   // const [user, setUser] = useState(null);
    // const unsubscribe = onAuthStateChanged(auth, (_user) => {
    //         setUser(_user);
    //         if (initializing) {
    //           setInitializing(false);
    //           setUser(null);
    //         }

    interface LoginProps {
        email: string;
        password: string;
    }
    
    interface ResponseProps {
        token: string;
        user: {
            name: string;
            email: string;
        };
    }
    
    export default function LogingUser({ email, password }: LoginProps): Promise<ResponseProps> {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve({
                    token: 'dfsf6sdfsdf6sdfbsdf6sb1fds6bs16fsd16sfdg6sdfgsfffdsrtyeil-0as,dfpsdw478389734',
                    user: {
                        name: password, // Adjust this if needed
                        email: email,
                    }
                });
            }, 2000);
        });
    }
    
