import IconWrapper from "@/ui/general/IconWrapper";
import { Check, Laptop, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import OptionItem from "../../OptionUI/OptionItem";
import OptionButton from "../../OptionUI/OptionButton";
import OptionIconEl from "../../OptionUI/OptionIconEl";
import OptionText from "../../OptionUI/OptionText";
import OptionContainer from "../../OptionUI/OptionContainer";
import { useTranslations } from "next-intl";

type ThemeOption = {
  id: "light" | "dark" | "system";
  themeName: string;
  Icon: typeof Sun;
};

function CheckMark({ id }: { id: ThemeOption["id"] }) {
  const { theme } = useTheme();
  if (!theme) return;
  if (id !== theme) return;
  return (
    <span className=" absolute right-2">
      <IconWrapper Icon={Check} size="small" />
    </span>
  );
}
function ThemeItem({
  option,
  onSelect,
}: {
  option: ThemeOption;
  onSelect: (theme: ThemeOption["id"]) => void;
}) {
  return (
    <OptionItem>
      <OptionButton action={() => onSelect(option.id)}>
        <OptionIconEl>
          <IconWrapper size="small" Icon={option.Icon} />
        </OptionIconEl>
        <OptionText>{option.themeName}</OptionText>
      </OptionButton>
      <CheckMark id={option.id} />
    </OptionItem>
  );
}

function ThemeSwitchSubItem() {
  const b = useTranslations("block");
  const { setTheme } = useTheme();

  const mapData: ThemeOption[] = [
    { id: "light", themeName: b("light"), Icon: Sun },
    { id: "dark", themeName: b("dark"), Icon: Moon },
    { id: "system", themeName: b("deviceTheme"), Icon: Laptop },
  ];

  const handleSwitch = (theme: ThemeOption["id"]) => {
    setTheme(theme);
  };

  return (
    <OptionContainer>
      {mapData.map((option) => (
        <ThemeItem key={option.id} option={option} onSelect={handleSwitch} />
      ))}
    </OptionContainer>
  );
}

export default ThemeSwitchSubItem;
