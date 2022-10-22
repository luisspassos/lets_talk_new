import { useBreakpointValue } from '@chakra-ui/react';
import { useRef } from 'react';
import { useVirtual } from 'react-virtual';
import { emojiCategories } from '../../../../../../../../utils/emojiCategories';
import { Emoji } from './Emoji';

type EmojiRows = JSX.Element[];

export function Scroll() {
  const parentRef = useRef<HTMLDivElement>(null);

  const width = parentRef.current?.clientWidth || 0;

  const emojiStyle = {
    size: useBreakpointValue([36, 41, 46]) || 0,
    fontSize: useBreakpointValue(['22px', '25px', '28px']) || '0px',
  };

  const emojisPerRow = Math.floor(width / emojiStyle.size);

  const components: (JSX.Element | EmojiRows)[] = [];

  function insertEmojis() {
    for (const categoryName in emojiCategories) {
      components.push(<h3>{categoryName}</h3>);

      const category = emojiCategories[categoryName];

      const emojiRows: EmojiRows[] = [[]];

      for (const emoji of category) {
        const getCurrentEmojiRow = () => {
          const index = emojiRows.length - 1;

          return emojiRows[index];
        };

        const row = getCurrentEmojiRow();

        const rowIsFilled = row.length === emojisPerRow;

        if (rowIsFilled) emojiRows.push([]);

        const rowToBeFilled = getCurrentEmojiRow();

        rowToBeFilled.push(
          <Emoji fontSize={emojiStyle.fontSize} size={emojiStyle.size} key={emoji.emoji}>
            {emoji.emoji}
          </Emoji>
        );
      }

      for (const row of emojiRows) {
        components.push(row);
      }
    }
  }

  insertEmojis();

  const virtualizer = useVirtual({
    size: components.length,
    parentRef,
    paddingEnd: 10,
    overscan: 0,
  });

  return (
    <div ref={parentRef} style={{ overflow: 'auto', scrollBehavior: 'smooth' }}>
      <div
        style={{
          height: virtualizer.totalSize,
          width: '100%',
          position: 'relative',
        }}
      >
        {virtualizer.virtualItems.map((item) => {
          const component = components[item.index];

          const isEmojis = Array.isArray(component);

          return (
            <div
              key={item.key}
              ref={item.measureRef}
              style={{
                display: 'flex',
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                paddingLeft: isEmojis ? '10px' : undefined,
                transform: `translateY(${item.start}px)`,
              }}
            >
              {component}
            </div>
          );
        })}
      </div>
    </div>
  );
}
