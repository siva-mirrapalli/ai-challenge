import {
  useDaily,
  useDailyEvent,
  useMeetingState,
} from "@daily-co/daily-react";
import { useCallback } from "react";
import {
  getCloseRobotButton,
  getCloseTranscriptButton,
  getOpenRobotButton,
  getOpenTranscriptButton,
  getProfileButton,
} from "../utils/custom-buttons";

export const assistantId = "assistant";
export const transcriptId = "transcript";
export const techStackId = "techStack";

export const CustomButtonEffects = () => {
  const daily = useDaily();
  const meetingState = useMeetingState();

  useDailyEvent(
    "sidebar-view-changed",
    useCallback((ev) => {
      if (meetingState !== "joined-meeting") return;
      const buttons = daily.customTrayButtons();

      switch (ev.view) {
        case assistantId:
          buttons[assistantId] = getCloseRobotButton();
          buttons[transcriptId] = getOpenTranscriptButton();
          break;
        case transcriptId:
          buttons[assistantId] = getOpenRobotButton();
          buttons[transcriptId] = getCloseTranscriptButton();
          break;
        case techStackId:
          buttons[techStackId] = getProfileButton();
        default:
          buttons[assistantId] = getOpenRobotButton();
          buttons[transcriptId] = getOpenTranscriptButton();
          break;
      }
      daily.updateCustomTrayButtons(buttons);
    }),
  );
};
