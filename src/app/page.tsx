import Homeclient from "@/components/HomeClient";
import { getSession } from "@/lib/getSession";

 

export default async function Home() {
  const session = await getSession()
  console.log(session);
  //1:12:40
  return (
    <>
        <Homeclient/>
        
    </>
  );
}
