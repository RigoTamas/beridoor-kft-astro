import BlazeSlider from "blaze-slider";

export type State = Record<string, { label: string; id: string; isVisible: boolean; isFilterTurnedOn: boolean }>;

export function isEveryFilterTurnedOff(state: State) {
  return Object.values(state).every((item) => !item.isFilterTurnedOn);
}

export function createInitialState({ items, fragment }: { items: Record<string, { label: string, id: string, text?: string }>, fragment?: string | undefined }): State {
  const state: State = Object.entries(items).reduce((acc, [id, item]) => {
    if (fragment) {
      return {
        ...acc,
        [id]: {
          ...item,
          isVisible: fragment === item.id,
          isFilterTurnedOn: fragment === item.id,
        },
      };
    } else {
      return {
        ...acc,
        [id]: {
          ...item,
          isVisible: true,
          isFilterTurnedOn: false,
        },
      };
    }
  }, {});
  return state
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
  classesToChangeOnFilter,
}: {
  selectedButton?: HTMLElement;
  state: State;
  classesToToggle: string[];
  classesToChangeOnFilter?: { element: HTMLElement, filterTurnedOffClasses: string[], filterTurnedOnClasses: string[] };
}) {
  if (selectedButton) {
    toggleStylingOnSelectedButton({ button: selectedButton, classesToToggle });
  }
  hideAndShowItems({ state, classesToChangeOnFilter });
}

const convertBoolToNum = (bool: boolean) => bool ? 1 : 0

export function hideAndShowItems({
  state,
  classesToChangeOnFilter,
}: {
  state: State;
  classesToChangeOnFilter?: { element: HTMLElement, filterTurnedOffClasses: string[], filterTurnedOnClasses: string[] };
}) {
  const sortedValuesByVisibleFirst = Object.values(state).sort((item1, item2) => convertBoolToNum(item2.isVisible) - convertBoolToNum(item1.isVisible))
  let isAnyFilterTurnedOn = false
  for (const item of sortedValuesByVisibleFirst) {
    const elements = document.getElementsByClassName(item.id);
    for (const element of elements) {
      if (item.isVisible) {
        if (item.isFilterTurnedOn) {
          isAnyFilterTurnedOn = true;
        }
        element.classList.remove("hidden");
      } else {
        element.classList.add("hidden");
      }
    }
  }
  if (classesToChangeOnFilter) {
    const classesToAdd = isAnyFilterTurnedOn ? classesToChangeOnFilter.filterTurnedOnClasses : classesToChangeOnFilter.filterTurnedOffClasses
    const classesToRemove = isAnyFilterTurnedOn ? classesToChangeOnFilter.filterTurnedOffClasses : classesToChangeOnFilter.filterTurnedOnClasses
    for (const classToAdd of classesToAdd) {
      classesToChangeOnFilter.element.classList.add(classToAdd)
    }
    for (const classToRemove of classesToRemove) {
      classesToChangeOnFilter.element.classList.remove(classToRemove)
    }
  }
}
