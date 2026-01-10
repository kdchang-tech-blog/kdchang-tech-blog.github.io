---
title: Flexbox Froggy 入門教學筆記 | 學習筆記
date: 2024-07-11 02:23:41
author: kdchang
tags: 
    - Flexbox Froggy
    - Flexbox
    - CSS

---

# 1. Flexbox 簡介

`Flexbox`（Flexible Box Layout）是一種 CSS3 佈局模式，專門用來設計一維的彈性佈局，適用於水平或垂直排列元素，使網頁排版更加靈活且易於維護。

Flexbox Froggy 透過小青蛙過河遊戲化方式去介紹 Flexbox 使用方式：

## Level 1
Welcome to Flexbox Froggy, a game where you help Froggy and friends by writing CSS code! Guide this frog to the lilypad on the right by using the justify-content property, which aligns items horizontally and accepts the following values:

flex-start: Items align to the left side of the container.
flex-end: Items align to the right side of the container.
center: Items align at the center of the container.
space-between: Items display with equal spacing between them.
space-around: Items display with equal spacing around them.
For example, justify-content: flex-end; will move the frog to the right. 

```css
#pond {
  display: flex;
  justify-content: flex-end;
}
```

## Level 2
Use justify-content again to help these frogs get to their lilypads. Remember that this CSS property aligns items horizontally and accepts the following values:

`flex-start`: Items align to the left side of the container.
`flex-end`: Items align to the right side of the container.
`center`: Items align at the center of the container.
`space-between`: Items display with equal spacing between them.
`space-around`: Items display with equal spacing around them.

```css
#pond {
  display: flex;
  justify-content: center;
}
```

## Level 3
Help all three frogs find their lilypads just by using justify-content. This time, the lilypads have lots of space all around them.

If you find yourself forgetting the possible values for a property, you can click on the property name to view them. Try clicking on justify-content.

```css
#pond {
  display: flex;
  justify-content: space-around;
}
```

## Level 4
Now the lilypads on the edges have drifted to the shore, increasing the space between them. Use justify-content. This time, the lilypads have equal spacing between them.

```css
#pond {
  display: flex;
  justify-content: space-between;
}
```

## Level 5
Now use align-items to help the frogs get to the bottom of the pond. This CSS property aligns items vertically and accepts the following values:

`flex-start`: Items align to the top of the container.
`flex-end`: Items align to the bottom of the container.
`center`: Items align at the vertical center of the container.
`baseline`: Items display at the baseline of the container.
`stretch`: Items are stretched to fit the container.

```css
#pond {
  display: flex;
  align-items: flex-end;
}
```

## Level 6
Lead the frog to the center of the pond using a combination of justify-content and align-items.

```css
#pond {
  display: flex;
  justify-content: center;
  align-items: center;
}
```

## Level 7
The frogs need to cross the pond again, this time for some lilypads with plenty of space around them. Use a combination of justify-content and align-items.

```css
#pond {
  display: flex;
  justify-content: space-around;
  align-items: flex-end;
}
```

## Level 8
The frogs need to get in the same order as their lilypads using flex-direction. This CSS property defines the direction items are placed in the container, and accepts the following values:

`row`: Items are placed the same as the text direction.
`row-reverse`: Items are placed opposite to the text direction.
`column`: Items are placed top to bottom.
`column-reverse`: Items are placed bottom to top.

```css
#pond {
  display: flex;
  flex-direction: row-reverse;
}
```

## Level 9
Help the frogs find their column of lilypads using flex-direction. This CSS property defines the direction items are placed in the container, and accepts the following values:

`row`: Items are placed the same as the text direction.
`row-reverse`: Items are placed opposite to the text direction.
`column`: Items are placed top to bottom.
`column-reverse`: Items are placed bottom to top.

```css
#pond {
  display: flex;
  flex-direction: column;
}
```

## Level 10
Help the frogs get to their own lilypads. Although they seem close, it will take both flex-direction and justify-content to get them there.

Notice that when you set the direction to a reversed row or column, start and end are also reversed.

```css
#pond {
  display: flex;
  flex-direction: row-reverse;
  justify-content: flex-end;
}
```

## Level 11
Help the frogs find their lilypads using flex-direction and justify-content.

Notice that when the flex direction is a column, justify-content changes to the vertical and align-items to the horizontal.

```css
#pond {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}
```

## Level 12
Help the frogs find their lilypads using flex-direction and justify-content.

```css
#pond {
  display: flex;
  flex-direction: column-reverse;
  justify-content: space-between;
}
```

## Level 13
Help the frogs find their lilypads using flex-direction, justify-content, and align-items.

```css
#pond {
  display: flex;
  flex-direction: row-reverse;
  justify-content: center;
  align-items: flex-end;
}
```

## Level 14
Sometimes reversing the row or column order of a container is not enough. In these cases, we can apply the order property to individual items. By default, items have a value of 0, but we can use this property to also set it to a positive or negative integer value `(-2, -1, 0, 1, 2)`.

Use the order property to reorder the frogs according to their lilypads.

```css
#pond {
  display: flex;
}

.yellow {
  order: 1;
}
```

## Level 15
Use the order property to send the red frog to his lilypad.

```css
#pond {
  display: flex;
}

.red {
  order: -1;
}
```

## Level 16
Another property you can apply to individual items is align-self. This property accepts the same values as align-items and its value for the specific item.

```css
#pond {
  display: flex;
  align-items: flex-start;
}

.yellow {
  align-self: flex-end;
}
```

## Level 17
Combine order with align-self to help the frogs to their destinations.

```css
#pond {
  display: flex;
  align-items: flex-start;
}

.yellow {
  order: 1;
  align-self: flex-end;
}
```

## Level 18
Oh no! The frogs are all squeezed onto a single row of lilypads. Spread them out using the flex-wrap property, which accepts the following values:

nowrap: Every item is fit to a single line.
wrap: Items wrap around to additional lines.
wrap-reverse: Items wrap around to additional lines in reverse.

```css
#pond {
  display: flex;
  flex-wrap: wrap;
}
```

## Level 19
Help this army of frogs form three orderly columns using a combination of flex-direction and flex-wrap.

```css
#pond {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
}
```

## Level 20
The two properties flex-direction and flex-wrap are used so often together that the shorthand property flex-flow was created to combine them. This shorthand property accepts the value of the two properties separated by a space.

For example, you can use flex-flow: row wrap to set rows and wrap them.

Try using flex-flow to repeat the previous level.

```css
#pond {
  display: flex;
  flex-flow: column wrap
}
```

## Level 21
The frogs are spread all over the pond, but the lilypads are bunched at the top. You can use align-content to set how multiple lines are spaced apart from each other. This property takes the following values:

`flex-start`: Lines are packed at the top of the container.
`flex-end`: Lines are packed at the bottom of the container.
`center`: Lines are packed at the vertical center of the container.
`space-between`: Lines display with equal spacing between them.
`space-around`: Lines display with equal spacing around them.
`stretch`: Lines are stretched to fit the container.
This can be confusing, but align-content determines the spacing between lines, while align-items determines how the items as a whole are aligned within the container. When there is only one line, align-content has no effect.

```css
#pond {
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
}
```

## Level 22
Now the current has bunched the lilypads at the bottom. Use align-content to guide the frogs there.

```css
#pond {
  display: flex;
  flex-wrap: wrap;
  align-content: flex-end;
}
```

## Level 23
The frogs have had a party, but it is time to go home. Use a combination of flex-direction and align-content to get them to their lilypads.

```css
#pond {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column-reverse;
  align-content: center;
}
```

## Level 24
Bring the frogs home one last time by using the CSS properties you've learned:

`justify-content`：Aligns flex items along the main axis.

flex-start (default) flex-end center space-between space-around space-evenly

`align-items`：Aligns flex items along the main axis.

flex-start (default) flex-end center space-between space-around space-evenly

`flex-direction`：Aligns flex items along the main axis.

flex-start (default) flex-end center space-between space-around space-evenly

`order`：Aligns flex items along the main axis.

flex-start (default) flex-end center space-between space-around space-evenly

`align-self`：Aligns flex items along the main axis.

flex-start (default) flex-end center space-between space-around space-evenly

`flex-wrap`：Aligns flex items along the main axis.

flex-start (default) flex-end center space-between space-around space-evenly

`flex-flow`：Aligns flex items along the main axis.

flex-start (default) flex-end center space-between space-around space-evenly

`align-content`：Aligns flex items along the main axis.

flex-start (default) flex-end center space-between space-around space-evenly

```css
#pond {
  display: flex;
  flex-wrap: wrap-reverse;
  justify-content: center;
  align-content: space-between;
  flex-direction: column-reverse;
}
```

## 參考文件
1. [flexboxfroggy](https://flexboxfroggy.com/)
