// 
import { Service } from 'typedi';
import { Repository } from '../../../lib/ddd';
import { CcbLog } from '../domain/model';

@Service()
export class CcbLogsRepository extends Repository<CcbLog, number> {
    entityClass = CcbLog;

    async find(conditions: {
        idx?: number[];
        name?: any;
        code?: string;
        countryCode?: string;
        userIdx?: number;
        usimId?: string;
    }): Promise<CcbLog[]> {
        const { idx, name, code, countryCode, userIdx, usimId } = conditions;

        const ccbLogsTest = await this.entityManager.query(`SELECT * FROM USERS`);

        const ccbLogs = await this.entityManager.find(CcbLog, {
            where: {
                usimId,
            },
            order: {},
            // limit:,
        });
        // LIMIT ${(page - 1) * limit}, ${limit};`

        return ccbLogs;
    }
}

ccb.date <= ? + INTERVAL 1 DAY - INTERVAL 1 SECOND - INTERVAL 
(TIMESTAMPDIFF
    (HOUR, UTC_TIMESTAMP(), CONVERT_TZ
    (UTC_TIMESTAMP(), 'UTC', ?))) HOUR
