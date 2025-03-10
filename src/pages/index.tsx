import { useState } from "react";

export default function Home() {
  const [signedUrl, setSignedUrl] = useState('');
  const [publicUrl, setPublicUrl] = useState('');

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const file = formData.get("file") as File;
    if (!file.size) {
      alert("No file selected");
      return;
    }

    const contentType = file.type;
    const res = await fetch(`/api/signed-url?contentType=${contentType}`);
    const { signedUrl, headers, publicUrl } = await res.json();

    const options = {
      method: "PUT",
      headers: headers,
      body: file,
    };

    await fetch(signedUrl, options);

    setSignedUrl(signedUrl);
    setPublicUrl(publicUrl);
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2 w-full'>
      <form onSubmit={onSubmit}>
        <input type='file' name='file' />
        <button
          type='submit'
          className='border border-slate-200 shadow-md hover:bg-slate-100 px-4 py-2 rounded-md'
        >
          Upload
        </button>
      </form>
      {signedUrl && (
        <div className='flex flex-col justify-center w-full p-10'>
          <div className="bg-gray-900">Signed URL:</div>
          <p className="break-words">{signedUrl}</p>
          <div className="bg-gray-900">Public URL:</div>
          <a href={publicUrl} target="_blank">{publicUrl}</a>
        </div>
      )}
    </div>
  );
}
// http://localhost:3000/api/signed-url?contentType=video/mp4