import * as Dialog from "@radix-ui/react-dialog";
import { CheckCircle, X } from "phosphor-react";
import { useState, useCallback } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import copy from "react-copy-to-clipboard";

interface ModalProps{
  discordId: string;
}

export function ConnectModal(id : ModalProps){
  const [discordTag, setDiscordTag] = useState(id.discordId);
  const [copied, setCopied] = useState(false);

  function CopyDiscordTag() {
    alert("Copied ! ");
  }

  const onCopy = useCallback(() => {
    setCopied(true);
  }, [])
  return(
    <Dialog.Portal>
          <Dialog.Overlay className='bg-black/80 inset-0 fixed'>
            <Dialog.Content className='fixed flex flex-col items-center bg-[#2A2634] py-8 px-16 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg shadow-lg shadow-black gap-6'>
              <Dialog.Close className='absolute left-[100%] -translate-x-[200%]'>
              <X size={24} weight="bold" className='text-zinc-400 '/>

              </Dialog.Close>
              <CheckCircle size={64} weight="bold" className="text-emerald-400"/>
              <div className='flex flex-col gap-1 items-center'>
                <Dialog.Title className='text-3xl font-black'>Let's Play</Dialog.Title>
                <span className='text-zinc-400'>Agora é só começar a jogar!</span>
              </div>

              <div className='flex flex-col items-center gap-2 w-full'>
                <strong className='font-semibold'>Adicione ao Discord</strong>
                <CopyToClipboard
                  onCopy={onCopy}
                  text={id.discordId}
                >
                  <button 
                  onClick={() => alert("copied!")}
                  className="font-semibold z-10 relative w-full py-4 bg-zinc-900 rounded-md text-center cursor-pointer hover:bg-transparent transition-all before:flex before:items-center before:justify-center hover:before:content-['COPIAR'] before:w-0 hover:before:w-full before:z-[10] before:absolute  before:h-full before:bg-gradient-to-r before:from-[#9572FC] before:via-[#43E7AD] before:to-[#E2D45C] before:top-0 before:left-0 before:transition-all before:rounded-md">
                    {id.discordId}
                  </button>
                </CopyToClipboard>
                
              </div>
            </Dialog.Content>
          </Dialog.Overlay>
        </Dialog.Portal>
  )
}