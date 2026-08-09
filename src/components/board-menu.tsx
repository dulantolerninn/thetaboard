"use client";

import { MainMenu } from "@excalidraw/excalidraw";
import { Newspaper } from "lucide-react";

export default function BoardMenu() {
  return <MainMenu><MainMenu.DefaultItems.LoadScene /><MainMenu.DefaultItems.SaveToActiveFile /><MainMenu.DefaultItems.SaveAsImage /><MainMenu.DefaultItems.SearchMenu /><MainMenu.DefaultItems.Help /><MainMenu.DefaultItems.ClearCanvas /><MainMenu.Separator /><MainMenu.Group title="Theta Board"><MainMenu.ItemLink icon={<LinkedInMark />} href="https://www.linkedin.com/in/tomasdulanto/" target="_blank" rel="noreferrer">LinkedIn</MainMenu.ItemLink><MainMenu.ItemLink icon={<Newspaper size={16} />} href="https://dulantotomass.substack.com/" target="_blank" rel="noreferrer">Substack</MainMenu.ItemLink></MainMenu.Group><MainMenu.Separator /><MainMenu.DefaultItems.ToggleTheme /><MainMenu.DefaultItems.ChangeCanvasBackground /></MainMenu>;
}

function LinkedInMark() { return <svg aria-hidden="true" viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><rect width="24" height="24" rx="3" /><text x="4" y="18" fill="white" fontFamily="Arial, sans-serif" fontSize="15" fontWeight="700">in</text></svg>; }
