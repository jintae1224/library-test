// src/App.tsx
import React from "react";
import useCheckbox from "./hooks/useCheckbox";

interface MyCheckboxItem {
  label: string;
  type: string;
  count: number;
}

const App: React.FC = () => {
  const data: MyCheckboxItem[] = [
    { label: "Option 1.png count-0", type: "png", count: 0 },
    { label: "Option 2.png count-1", type: "png", count: 1 },
    { label: "Option 3.csv count-2", type: "csv", count: 2 },
    { label: "Option 4.jpg count-3", type: "jpg", count: 3 },
    { label: "Option 5.csv count-4", type: "csv", count: 4 },
    { label: "Option 6.csv count-5", type: "csv", count: 5 },
    { label: "Option 7.pdf count-6", type: "pdf", count: 6 },
    { label: "Option 8.pdf count-7", type: "pdf", count: 7 },
    { label: "Option 9.png count-8", type: "png", count: 8 },
    { label: "Option 10.xlxs count-9", type: "xlxs", count: 9 },
    { label: "Option 11.pdf count-10", type: "pdf", count: 10 },
    { label: "Option 12.xlxs count-11", type: "xlxs", count: 11 },
  ];

  const {
    items,
    allChecked,
    checkedItems,
    setAllItems,
    setItemById,
    setItemByCondition,
  } = useCheckbox(data);

  const onClickEventCount = () => {
    setItemByCondition((item) => item.type == "pdf");
  };

  const onClickEventType = () => {
    setItemByCondition((item) => item.type === "csv", "add");
  };

  return (
    <div>
      <button onClick={setAllItems}>
        {allChecked ? "Uncheck All" : "Check All"}
      </button>
      <button onClick={onClickEventCount}>{`count > 5`}</button>
      <button onClick={onClickEventType}>{`type = csv`}</button>
      {items.map((checkbox) => (
        <div key={checkbox.id}>
          <label>
            <input
              type="checkbox"
              checked={checkbox.checked}
              onChange={() => setItemById(checkbox.id)}
            />
            {checkbox.label}
          </label>
        </div>
      ))}
      <div>
        <h3>Checked Items:</h3>
        <ul>
          {checkedItems.map((item) => (
            <li key={item.id}>{item.label}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
