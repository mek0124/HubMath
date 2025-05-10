export default function DiscordServer() {
  // Note: Discord widget may show cookie warnings in console due to cross-site cookies
  // These are from Discord's servers and not directly fixable from our end
  return (
    <div className="flex flex-col items-center justify-evenly w-full flex-grow mb-10">
      <h3 className="font-bold text-fontColor text-4xl w-full text-center">
        Want To Be Apart Of The Community?
      </h3>

      <iframe
        title="Discord iFrame"
        src="https://discord.com/widget?id=1204576133245575209&theme=dark"
        width="800"
        height="600"
        allowtransparency="true"
        frameBorder="0"
        sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
        className="mb-10"
      >
      </iframe>
    </div>
  );
};
