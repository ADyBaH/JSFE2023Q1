import { ButtonForPlayground } from '../app/components/layouts/game/button-for-game-field'

export function generateMatrixWithButtons(parent, numberOfButton) {
  return Array.from({ length: numberOfButton }, (_, firstIndex) =>
    Array.from(
      { length: numberOfButton },
      (__, secondIndex) =>
        new ButtonForPlayground(
          {
            field: parent,
            events: [
              {
                name: 'contextmenu',
                callback: (event) => event.preventDefault(),
              },
            ],
          },
          [firstIndex, secondIndex],
        ),
    ),
  )
}
