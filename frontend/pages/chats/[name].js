import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../../context/auth/authContext";

import dynamic from "next/dynamic";
import { useRouter } from "next/router";

const ChatEngine = dynamic(() =>
  import("react-chat-engine").then((module) => module.ChatEngine)
);
import { getOrCreateChat } from "react-chat-engine";

export default function Home() {
  // const { username, secret } = useContext(Context);
  const [showChat, setShowChat] = useState(false);

  const authContext = useContext(AuthContext);

  const { user } = authContext;

  const router = useRouter();

  const { name } = router.query;

  console.log({ name });

  const username = user?.name;
  const secret = user?._id;

  // const [chatUsername, setChatUsername] = useState("");

  function createDirectChat(creds, chatUsername) {
    getOrCreateChat(
      creds,
      { is_direct_chat: true, usernames: [chatUsername] },
      () => setChatUsername("")
    );
  }

  useEffect(() => {
    if (typeof document !== undefined) {
      setShowChat(true);
    }
  }, []);

  //   useEffect(() => {
  //     if(name!==null)
  //     createDirectChat(chatUsername)
  //   },[name])

  useEffect(() => {
    if (username === "" || secret === "") {
      router.push("/");
    }
  }, [username, secret]);

  // function renderChatForm(creds) {
  //   return (
  //     <div>
  //       <input
  //         placeholder="Username"
  //         value={chatUsername}
  //         onChange={(e) => setChatUsername(e.target.value)}
  //         className="mt-6 bg-gray-100 rounded-md p-3"
  //       />
  //       <button
  //         onClick={() => createDirectChat(creds)}
  //         className="rounded-md p-3 text-white font-bold bg-primary mt-6"
  //       >
  //         Create
  //       </button>
  //     </div>
  //   );
  // }

  if (!showChat) return <div />;

  return (
    <div className="background">
      <div className="shadow text-black">
        <ChatEngine
          height="calc(100vh - 212px)"
          projectID="4f1c26e8-731a-4fb9-a2fe-dd73223ba9ce"
          userName={user?.name}
          userSecret={user?._id}
          renderNewChatForm={(creds) => createDirectChat(creds, name)}
        />
      </div>
    </div>
  );
}
