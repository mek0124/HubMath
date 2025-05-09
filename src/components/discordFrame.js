export default function DiscordServer() {
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <h3 className="font-bold text-fontColor text-2xl w-full text-center">
        Want To Be Apart Of The Community?
      </h3>

      <iframe 
        title="Discord iFrame" 
        src="https://discord.com/widget?id=1204576133245575209&theme=dark" 
        width="450" 
        height="250" 
        allowtransparency="true" 
        frameborder="0" 
        sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
        className="mt-4"
      >    
      </iframe>
    </div>
  );
};
