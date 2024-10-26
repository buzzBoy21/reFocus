```json
{
  "keyboard-id": 1,
  "gapsForKeysInWidth": 44, //how much gaps have the keyboard in width
  //Please see how can you calculate this value in the
  "gapsForKeysInHeight": 6,
  "format": [
    //format include keys, gaps withoutKeys, and small space
    {
      //specific if is key,gaps withoutKeys or small space. To understand this go to the first or the second example section of allKeyboard_JSON.md
      "type": "key",
      //size of the key can be:
      // - normal: It is  1x1 (width x height)  [1 is equivalent to the space of 1 key]
      // - wide-horizontal: 2*1 (width x height)  [1 is equivalent to the space of 1 key]
      // - wide-vertical: 1*2 (width x height)  [1 is equivalent to the space of 1 key]
      // - square: 2*2  [2 is equivalent to the space of 2 key]
      // - custom: "width/height" as string you have to add how many space you want fill the key for example_
      //            - 1/1: is a normal key
      //            - 1/2: is a wide-vertical
      //            - 1/5: is a space bar
      "size": "normal",
      // the key-type is the class (CSS) of the you can add an JS object with css to personalize de key
      "key-style": "digital-white-Key",

      "key-value": "esc", // Value of the key to identify which key was pressed by the backend (logic of the program). These values are indicated in the IMPORTANT-----> table about equivalents.<-------IMPORTANT

      "key-label": "esc" // They are the characters which will show on key.

      //For example if you config the key with:
      // - "key-value": "esc"
      // - "key-label":"chocobo"
      //You will see a key labeled with the word 'chocobo,' but its internal behavior will function like a normal Esc key.
    },
    {
      "type": "key", //gap without key
      "size": "3/3", //custom size
      "key-style": "darker-3d", //You don't need use the same style to all key. Each key can be UNIQUE
      "key-label": "😏",
      "key-value": "a" //When I press the key with 😏, the system will interpret it as if you pressed the 'a' key.
    }
  ]
}
```
