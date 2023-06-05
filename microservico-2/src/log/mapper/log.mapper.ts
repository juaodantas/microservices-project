import { LogListItemDto } from '../dto/log-list-item.dto';
import { Log } from '../entities/log.entity';

export class LogMapper {
  /**
   * This method transform Log in LogListItem
   * @param log
   * @returns LogListItemDto
   */
  static async toUserItem(log: Log): Promise<LogListItemDto> {
    return {
      id: log.id,
      action: log.action,
      payload: log.payload,
      timestamp: log.timestamp,
    };
  }

  /**
   * This method transform Log in LogListItemDto
   * @param logList
   * @returns LogListItemDto
   */
  static async toUserListItem(logList: Log[]): Promise<LogListItemDto[]> {
    let logListItem: LogListItemDto[] = [];

    logListItem = logList.map(
      (logMapper) =>
        <LogListItemDto>{
          id: logMapper.id,
          action: logMapper.action,
          payload: logMapper.payload,
          timestamp: logMapper.timestamp,
        },
    );

    return logListItem;
  }
}
