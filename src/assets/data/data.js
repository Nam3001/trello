const data = [
    {
        boardId: 'board1',
        boardName: 'board_1',
        columnOrder: ['column3', 'column2', 'column1'],
        columns: {
            boardId: 1,
            columnList: [
                {
                    columnId: 'column1',
                    columnName: 'column_1',
                    boardId: 'board1',
                    cardOrder: ['card5', 'card2', 'card3', 'card4', 'card1'],
                    cardList: [
                        { cardId: 'card1', content: 'card_01', cover: null },
                        { cardId: 'card2', content: 'card_02', cover: null },
                        { cardId: 'card3', content: 'card_03', cover: null },
                        { cardId: 'card4', content: 'card_04', cover: null },
                        { cardId: 'card5', content: 'card_05', cover: null }
                    ]
                },
                {
                    columnId: 'column2',
                    columnName: 'column_2',
                    boardId: 'board1',
                    cardOrder: ['card6', 'card7', 'card8', 'card9', 'card10', 'card11', 'card12', 'card13', 'card14'],
                    cardList: [
                        { cardId: 'card6', content: 'card_06', cover: null },
                        { cardId: 'card7', content: 'card_07' },
                        { cardId: 'card8', content: 'card_08' },
                        { cardId: 'card9', content: 'card_09' },
                        { cardId: 'card10', content: 'card_10' },
                        { cardId: 'card11', content: 'card_11' },
                        { cardId: 'card12', content: 'card_12' },
                        { cardId: 'card13', content: 'card_13' },
                        { cardId: 'card14', content: 'card_14' }
                    ]
                },
                {
                    columnId: 'column3',
                    boardId: 'board1',
                    columnName: 'column_3',
                    cardOrder: ['card15', 'card16', 'card17'],
                    cardList: [
                        { cardId: 'card15', content: 'card_15' },
                        { cardId: 'card16', content: 'card_16' },
                        { cardId: 'card17', content: 'card_17' }
                    ]
                }
            ]
        }
    }
]

export default data