"use client";
import IconSideNav from "@/components/Sidebar/Sidebar";

export default function Home() {
  // const { account, setUser } = useAppwrite();
  // const [user, setUseer] = useState(null);
  // const [userImage, setUserImage] = useState("");

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     if (!user) {
  //       const user = await account.get();
  //       setUseer(user);
  //       const userImage = gravatar.url(
  //         user.email,
  //         { s: "200", d: "identicon" },
  //         true
  //       );
  //       setUserImage(userImage);
  //     }
  //   };
  //   fetchUser();
  // });

  // console.log(user.)

  return (
    <main className="w-screen h-auto p-4">
      <IconSideNav />
    </main>
  );
}
