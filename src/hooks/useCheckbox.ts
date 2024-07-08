import { useState, useEffect } from "react";
import { nanoid } from "nanoid";

interface CheckboxItem {
  id: string;
  checked: boolean;
}

interface UseCheckboxGroup<T extends object> {
  items: (T & CheckboxItem)[];
  allChecked: boolean;
  checkedItems: (T & CheckboxItem)[];
  setItemById: (id: string) => void;
  setItemByCondition: (
    predicate: (item: T & CheckboxItem) => boolean,
    option?: string
  ) => void;
  setAllItems: () => void;
}

const useCheckbox = <T extends object>(
  initialCheckboxes: T[]
): UseCheckboxGroup<T> => {
  // T에 id가 없을 때, id 추가 , checked 여부 추가
  const initializeCheckboxes = (items: T[]): (T & CheckboxItem)[] => {
    return items.map((item) => ({
      ...item,
      id: (item as T & CheckboxItem).id || nanoid(),
      checked: (item as T & CheckboxItem).checked ?? false,
    }));
  };

  /* 전체 Checkbox Items */
  const [items, setItems] = useState(initializeCheckboxes(initialCheckboxes));

  // 전체 선택 여부
  const [allChecked, setAllChecked] = useState(false);
  // check 된 CheckBox Items
  const [checkedItems, setCheckedItems] = useState<(T & CheckboxItem)[]>([]);

  useEffect(() => {
    setCheckedItems(items.filter((checkbox) => checkbox.checked));
  }, [items]);

  /**
   * check 상태 control handler
   * @param {string} id id 값
   */
  const setItemById = (id: string) => {
    const updatedCheckboxes = items.map((checkbox) =>
      checkbox.id === id
        ? { ...checkbox, checked: !checkbox.checked }
        : checkbox
    );
    setItems(updatedCheckboxes);
    setAllChecked(updatedCheckboxes.every((checkbox) => checkbox.checked));
  };

  /**
   * 전체 선택 handler
   */
  const setAllItems = () => {
    const newCheckedState = !allChecked;
    const updatedCheckboxes = items.map((checkbox) => ({
      ...checkbox,
      checked: newCheckedState,
    }));
    setItems(updatedCheckboxes);
    setAllChecked(newCheckedState);
  };

  /**
   * 조건 선택 handler
   */
  const setItemByCondition = (
    predicate: (item: T & CheckboxItem) => boolean,
    option?: string
  ) => {
    const conditionItems = items.filter(predicate);
    const allConditionItemsChecked = conditionItems.every(
      (item) => item.checked
    );

    const updatedCheckboxes = items.map((checkbox) => {
      if (allConditionItemsChecked) {
        return predicate(checkbox) ? { ...checkbox, checked: false } : checkbox;
      } else {
        if (option === "add") {
          return predicate(checkbox)
            ? { ...checkbox, checked: true }
            : checkbox;
        } else {
          return predicate(checkbox)
            ? { ...checkbox, checked: true }
            : { ...checkbox, checked: false };
        }
      }
    });

    setItems(updatedCheckboxes);
  };

  return {
    items,
    allChecked,
    checkedItems,
    setItemById,
    setItemByCondition,
    setAllItems,
  };
};

export default useCheckbox;
