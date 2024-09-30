import { Unit } from '../../../../engine/Unit';
import { CheckersRule } from '../../commons/CheckersRule';
import { KingMoveBackLeft } from '../actions/KingMoveBackLeft';
import { KingMoveBackRight } from '../actions/KingMoveBackRight';
import { KingMoveFrontLeft } from '../actions/KingMoveFrontLeft';
import { KingMoveFrontRight } from '../actions/KingMoveFrontRight';
import { CheckersUnit, CheckersInteractiveEntity, CheckersUnitAction, CheckersGame } from '../CheckersRuTypings';

export class MoveRulesForKing extends CheckersRule {
  isSuitable(entity: CheckersInteractiveEntity): entity is CheckersUnit {
    return entity instanceof Unit;
  }

  getActions(
    game: CheckersGame,
    entity: CheckersUnit,
  ): CheckersUnitAction[] {
    return [
      new KingMoveFrontLeft(game, this, entity, 1),
      new KingMoveFrontRight(game, this, entity, 1),
      new KingMoveBackLeft(game, this, entity, 1),
      new KingMoveBackRight(game, this, entity, 1),

      new KingMoveFrontLeft(game, this, entity, 2),
      new KingMoveFrontRight(game, this, entity, 2),
      new KingMoveBackLeft(game, this, entity, 2),
      new KingMoveBackRight(game, this, entity, 2),

      new KingMoveFrontLeft(game, this, entity, 3),
      new KingMoveFrontRight(game, this, entity, 3),
      new KingMoveBackLeft(game, this, entity, 3),
      new KingMoveBackRight(game, this, entity, 3),

      new KingMoveFrontLeft(game, this, entity, 4),
      new KingMoveFrontRight(game, this, entity, 4),
      new KingMoveBackLeft(game, this, entity, 4),
      new KingMoveBackRight(game, this, entity, 4),

      new KingMoveFrontLeft(game, this, entity, 5),
      new KingMoveFrontRight(game, this, entity, 5),
      new KingMoveBackLeft(game, this, entity, 5),
      new KingMoveBackRight(game, this, entity, 5),

      new KingMoveFrontLeft(game, this, entity, 6),
      new KingMoveFrontRight(game, this, entity, 6),
      new KingMoveBackLeft(game, this, entity, 6),
      new KingMoveBackRight(game, this, entity, 6),

      new KingMoveFrontLeft(game, this, entity, 7),
      new KingMoveFrontRight(game, this, entity, 7),
      new KingMoveBackLeft(game, this, entity, 7),
      new KingMoveBackRight(game, this, entity, 7),
    ];
  }
}
