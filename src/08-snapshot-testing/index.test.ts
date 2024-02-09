import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  test('should generate linked list from values 1', () => {
    const arrayNumbers = [1, 2, 3];
    const expectLinkedList = {
      next: {
        next: {
          next: {
            next: null,
            value: null,
          },
          value: 3,
        },
        value: 2,
      },
      value: 1,
    };

    const linkedList = generateLinkedList(arrayNumbers);

    expect(linkedList).toStrictEqual(expectLinkedList);
  });

  test('should generate linked list from values 2', () => {
    const arrayNumbers = [1, 2, 3];

    const linkedList = generateLinkedList(arrayNumbers);

    expect(linkedList).toMatchSnapshot();
  });
});
