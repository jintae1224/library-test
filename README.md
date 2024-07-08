# Check4React

![npm](https://img.shields.io/npm/v/check4react)

checkbox 관리를 위한 hook

## Installation

### npm

    npm install check4react

### yarn

    yarn add check4react

### pnpm

    pnpm add check4react

## Usage

```js
import { useCheckbox } from "check4react";

const {
  items,
  allChecked,
  checkedItems,
  setAllItems,
  setItemById,
  setItemByCondition,
} = useCheckbox(data);
```

### 1. items

전체 data 값을 반환합니다.
data에 id값이 존재 하지 않을 경우, nanoid로 생성된 id가 추가 됩니다.

#### type

    T & { id : string, checked : boolean}

### 2. allChecked

전체 선택 여부를 반환 합니다.

#### type

    boolean

### 3. checkedItems

checked의 value가 true인 data를 반환 합니다.

#### type

    T & { id : string, checked : boolean}

### 4. setAllItems

전체 data의 checked value를 true로 변경 합니다.

#### example

```js
import { useCheckbox } from "check4react";

const { setAllItems } = useCheckbox(data);

...

const onClickAll = () => {
    setAllItems()
}

```

### 5. setItemById

전체 data 중 하나의 id 값과 같은 item의 checked value를 true로 변경합니다.

#### example

```ts
import { useCheckbox } from "check4react";

const { setItemById } = useCheckbox(data);

...

const onClickItem = (id : number) => {
    setItemById(id)
}

```

### 6. setItemByCondition

전체 data 중 조건에 일치하는 items의 checked value를 true로 변경합니다.

#### option

    "add" : 기존 checked 상태 + 조건과 일치 하는 items

#### example 1 (default)

```ts
import { useCheckbox } from "check4react";

const { setItemById } = useCheckbox(data);

...

const onClickEventCount = () => {
    setItemByCondition((item) => item.count >= 5);
};

```

#### example 1 (option : add)

```ts
import { useCheckbox } from "check4react";

const { setItemById } = useCheckbox(data);

...

const onClickEventType = () => {
    setItemByCondition((item) => item.type === "csv" && item.count >= 5, "add");
  };

```
