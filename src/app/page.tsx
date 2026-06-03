import Homeclient from "@/components/HomeClient";
import { getSession } from "@/lib/getSession";

 

export default async function Home() {
  const session = await getSession()
   
   
  return (
    <>
        <Homeclient email={session?.user?.email!}/>
        
    </>
  );
}
