import { MissionUtils } from "@woowacourse/mission-utils";
import Car from "./Car.js";
import { validateCarNumber } from "./validater.js";

class App {
  async play() {
    const carNames = await MissionUtils.Console.readLineAsync(
      "경주할 자동차 이름을 입력하세요.(이름은 쉼표(,) 기준으로 구분)\n"
    );

    if (validateCarNumber) {
      throw new Error("[ERROR] 자동차 2대 이상부터 경주를 할 수 있습니다.");
    }

    let carArray = carNames.split(",");

    carArray = carArray.map((carName) => new Car(carName));

    const roundNum = await MissionUtils.Console.readLineAsync(
      "시도할 횟수는 몇 회인가요?\n"
    );

    MissionUtils.Console.print(`\n실행 결과`);
    for (let i = 0; i < roundNum; i += 1) {
      carArray.forEach((car) => {
        let randomNumber = MissionUtils.Random.pickNumberInRange(0, 9);
        if (randomNumber >= 4) {
          car.distance += 1;
        }
        const hyphen = "-".repeat(car.distance);
        MissionUtils.Console.print(`${car.name} : ${hyphen}`);
      });
      MissionUtils.Console.print(``);
    }

    let winners = [];
    let maxDistance = -1;
    carArray.forEach((car) => {
      if (car.distance >= maxDistance) {
        maxDistance = car.distance;
      }
    });
    winners = carArray.filter((car) => car.distance === maxDistance);

    const WinnerResultText = winners.map((car) => car.name).join(", ");

    MissionUtils.Console.print(`최종 우승자 : ${WinnerResultText}`);
  }
}

export default App;
