import { Mail, ExternalLink } from "lucide-react";
import Link from "next/link";
function Footer() {
  return (
    <footer className="w-full bg-inherit  border-t border-divided  py-8 px-4">
      <div className="grid grid-cols-1  lg:grid-cols-3 sm:grid-cols-2 gap-8">
        <div className="space-y-4 sm:col-span-2 lg:col-auto col-auto">
          <h3 className="text-white font-bold text-lg">ဤ ပရောဂျက် အကြောင်း</h3>
          <p className="text-zinc-400 text-sm leading-relaxed">
            ဤ သီချင်းနားဆင်နိုင်သော ဘဘယ်လ် ဝက်ဘ်အက်ပ်သည် TypeScript ၊ React ၊
            Nextjs တို့ဖြင့် သရုပ်ပြသရန်အတွက် ဖန်တီးထားသော ကိုယ်ပိုင် ဝက်ဘ်အက်ပ်
            ပရောဂျက်တစ်ခုဖြစ်ပါသည်။ရိူးရှင်းပြီး အသုံးပြုရ
            လွယ်ကူသောဒီဇိုင်းဖြင့် ဖန်တီးထားပြီး အသုံးပြုသူ အနေဖြင့်
            သီချင်းနားထောင်ခြင်း ၊ သိမ်းဆည်းခြင်း အပြင် အခြားသူများဖြင့်ပါ
            တိုက်ရိုက်နားဆင်နိုင်ပါသည်။
          </p>
          <div className="bg-zinc-800/50 p-3 rounded-md border border-borderFull">
            <p className="text-amber-400 text-sm font-medium leading-relaxed">
              ⚠️ ရှင်းလင်းချက် - ဤပရောဂျက်မှာ စီးပွားဖြစ်မဟုတ်သော
              ကိုယ်ပိုင်နမူနာပြသမှု ပရောဂျက်တစ်ခုဖြစ်ပါသည်။
              အသုံးပြုသိမ်းဆည်းထားသော မည်သည့်သီချင်း/ဓာတ်ပုံဧ။်
              မူပိုင်ခွင့်ကိုမျှ ကျွန်တော် မပိုင်ဆိုင်ပါ သို့မဟုတ်
              မူပိုင်ခွင့်ကိုလည်း မတောင်းဆိုပါ။ အကြောင်းအရာအားလုံးကို
              သရုပ်ပြသရန်အတွက်သာ အသုံးပြုပါသည်။ ကိုယ်ပိုင်ရေးသားထားသော Source
              Code ကိုသာ ကျွန်တော် ပိုင်ဆိုင်ပါသည်။
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-white font-bold text-lg">
            အသုံးပြုထားသော နည်းပညာများ
          </h3>
          <ul className="grid grid-cols-2 gap-2">
            <li className="text-zinc-400 text-sm">
              <div className=" flex gap-1">
                <span>•</span>
                <span>React</span>
              </div>
            </li>
            <li className="text-zinc-400 text-sm">
              <div className=" flex gap-1">
                <span>•</span>
                <span>Next.js</span>
              </div>
            </li>
            <li className="text-zinc-400 text-sm">
              <div className=" flex gap-1">
                <span>•</span>
                <span>TypeScript</span>
              </div>
            </li>
            <li className="text-zinc-400 text-sm">
              <div className=" flex gap-1">
                <span>•</span>
                <span>Tailwind CSS</span>
              </div>
            </li>
            <li className="text-zinc-400 text-sm">
              <div className=" flex gap-1">
                <span>•</span>
                <span> Supabase</span>
              </div>
            </li>
            <li className="text-zinc-400 text-sm">
              <div className=" flex gap-1">
                <span>•</span>
                <span>HTML5 MediaSource API</span>
              </div>
            </li>
          </ul>
        </div>

        <div className="space-y-4">
          <h3 className="text-white font-bold text-lg">ဆက်သွယ်ရန်</h3>
          <p className="text-zinc-400 text-sm leading-relaxed">
            ကျွန်တော်သည် လက်ရှိတွင် အခွင့်အလမ်းသစ်များ ရှာဖွေနေပါသည်။
          </p>
          <div className="flex flex-col space-y-3">
            <Link
              target="_"
              href="mailto:khantlu24@gmail.com"
              className="text-zinc-400 hover:text-white transition-colors text-sm flex items-center gap-2"
            >
              <Mail size={16} />
              <span className=" block truncate">khantlu24@gmail.com</span>
            </Link>
            <Link
              href="https://github.com/aungchanpyae33"
              className="text-zinc-400 hover:text-white transition-colors text-sm flex items-center gap-2"
            >
              <svg
                role="img"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                width={16}
                height={16}
                fill="currentColor"
              >
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
              </svg>
              <span className=" block truncate">github.com/aungchanpyae33</span>
            </Link>

            <Link
              href="https://yourportfolio.com"
              className="text-zinc-400 hover:text-white transition-colors text-sm flex items-center gap-2"
            >
              <ExternalLink size={16} />
              ကျွန်တော်ဧ။် ပို့ဖိုလီယိုကို ကြည့်ရှုရန်
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-divided flex flex-col md:flex-row justify-between items-center">
        <p className="text-zinc-500 text-sm">
          © 2025 AungChanPyae မူပိုင်ခွင့်အားလုံးရှိသည်။
        </p>
        <p className="text-zinc-500 text-sm mt-2 md:mt-0">
          နမူနာ ပရောဂျက်အဖြစ် သရုပ်ပြရန်အတွက်သာ ဖန်တီးထားပါသည်။
        </p>
      </div>
    </footer>
  );
}

export default Footer;
