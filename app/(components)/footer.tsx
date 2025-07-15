export default function Footer() {
    return (
      <div className="border-b-4 border-black flex-1 py-4 px-2 ">
        <div className="flex justify-between font-oswald footer">
          <div className="flex">
            Contact: <br/>
            22atobar@gmail.com <br/>
            (419)-494-7222
          </div>
          <div>
            Made using Next.js and React <br/>
            Deployed using Vercel
          </div>
        </div>
      </div>
    );
  }