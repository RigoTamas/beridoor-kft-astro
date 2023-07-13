export type State = Record<string, { label: string; id: string; isVisible: boolean; isFilterTurnedOn: boolean }>;

export function isEveryFilterTurnedOff(state: State) {
  return Object.values(state).every((item) => !item.isFilterTurnedOn);
}

export function updateStateAndButtonBackground({
  state,
  items,
  buttonsMap,
  currentId,
  classesToRemove,
  classesToToggle,
}: {
  state: State;
  items: Record<string, unknown>,
  buttonsMap: Record<string, HTMLElement>;
  currentId: string;
  classesToRemove: string[];
  classesToToggle: string[];
}) {
  if (isEveryFilterTurnedOff(state)) {
    for (const innerId of Object.keys(items)) {
      const button = buttonsMap[innerId];
      removeStylingFromNonSelectedButton({ button, classesToRemove });
      state[innerId].isVisible = true;
    }
  } else {
    for (const innerId of Object.keys(items)) {
      const currentState = state[innerId];
      const button = buttonsMap[innerId];
      if (innerId === currentId) {
        currentState.isVisible = true;
        toggleStylingOnSelectedButton({ button, classesToToggle });
      } else {
        currentState.isFilterTurnedOn = false;
        currentState.isVisible = false;
        removeStylingFromNonSelectedButton({ button, classesToRemove });
      }
    }
  }
}

export function removeStylingFromNonSelectedButton({
  button,
  classesToRemove,
}: {
  button: HTMLElement;
  classesToRemove: string[];
}) {
  for (const classToRemove of classesToRemove) {
    button.classList.remove(classToRemove);
  }
}

export function toggleStylingOnSelectedButton({
  button,
  classesToToggle,
}: {
  button: HTMLElement;
  classesToToggle: string[];
}) {
  for (const classToRemove of classesToToggle) {
    button.classList.toggle(classToRemove);
  }
}

export function setInitialUi({
  state,
  selectedButton,
  classesToToggle,
  changeFilteredItemSize,
}: {
  selectedButton: HTMLElement;
  state: State;
  classesToToggle: string[];
  changeFilteredItemSize: { smallClass: string; largeClass: string };
}) {
  toggleStylingOnSelectedButton({ button: selectedButton, classesToToggle });
  hideAndShowItems({ state, changeFilteredItemSize });
}

export function hideAndShowItems({
  state,
  changeFilteredItemSize,
}: {
  state: State;
  changeFilteredItemSize?: { smallClass: string; largeClass: string };
}) {
  for (const item of Object.values(state)) {
    const elements = document.getElementsByClassName(item.id);
    for (const element of elements) {
      if (item.isVisible) {
        if (changeFilteredItemSize) {
          if (item.isFilterTurnedOn) {
            element.classList.remove(changeFilteredItemSize.smallClass);
            element.classList.add(changeFilteredItemSize.largeClass);
          } else {
            element.classList.add(changeFilteredItemSize.smallClass);
            element.classList.remove(changeFilteredItemSize.largeClass);
          }
        }
        element.classList.remove("hidden");
      } else {
        element.classList.add("hidden");
      }
    }
  }
}
