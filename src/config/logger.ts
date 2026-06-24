import * as appInsights from 'applicationinsights';
import winston from 'winston';
import { envs } from './envs';

const transports: winston.transport[] = [new winston.transports.Console()];

if (envs.APPINSIGHTS_CONNECTION_STRING) {
    appInsights
        .setup(envs.APPINSIGHTS_CONNECTION_STRING)
        .setSendLiveMetrics(true)
        .setAutoCollectConsole(false)
        .start();

    const aiClient = appInsights.defaultClient;
    transports.push(
        new winston.transports.Console({
            level: 'info',
            format: winston.format.printf((obj) => {
                const { level, message, timeStamp } = obj;
                aiClient.trackTrace({
                    message: `[${level} ${message} ${timeStamp}]`,
                    properties: { timeStamp },
                });
                return `[${level} ${message} ${timeStamp}]`;
            }),
        }),
    );
}

export const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
    ),
    transports,
});
