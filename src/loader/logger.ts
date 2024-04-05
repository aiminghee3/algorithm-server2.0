const winston = require("winston");
const winstonDaily = require("winston-daily-rotate-file"); 
const path = require("path"); // node의 내장 모듈 path를 사용하면, 저장할 디렉토리를 알 수 있습니다.
const appRoot = require("app-root-path"); // **app-root-path** 모듈을 사용하면 app의 root path에 쉽게 접근할 수 있습니다.
const { createLogger } = require("winston"); 
const logDir = `${appRoot}/logs`; // 디렉토리 'logs'의 하위 파일로 저장됩니다.

const { combine, timestamp, label, printf } = winston.format;

type LogLevel = 'error' | 'warn' | 'info' | 'verbose' | 'debug' | 'silly';

type Format = ()=>{
    level : LogLevel;
    message : string;
    label : string;
    timestamp : string;
}

// 로그 네이밍 설정
interface LogFormatInfo {
    timestamp: string;
    level: LogLevel;
    message: string;
}

const logFormat: Format = printf((info: LogFormatInfo) => {
    return `${info.timestamp} ${info.level}: ${info.message}`;
});

// logger 생성
const logger = createLogger({
  format: combine(label({ label: "NODE_PROJECT" }), timestamp(), logFormat),
	// format은 로그의 다양한 형식을 지정합니다.  
  // 그중 combine은 여러 형식을 혼합해서 사용할 때 활용됩니다.
	// label의 값은 일반적으로 시스템 명으로 지정합니다.

	// transports에는, 다양한 형식에 맞는 로그 메시지 정의합니다.
  transports: [
    new winstonDaily({
      level: "info", 
      datePattern: "YYYY-MM-DD", 
      dirname: logDir, // dirname은 저장할 디렉토리입니다.
      filename: "%DATE%.log", // %DATE%를 하면, 자동적으로 파일명이 생성됩니다.
      maxSize: "20m", // maxSize는 저장할 로그 파일의 최대 크기입니다. 
											// 최대 크기를 초과하면 앞에 기록된 메시지가 삭제됩니다.
											// 굳이 정의를 하지 않아도 괜찮습니다.
      maxFiles: "30d", // maxFiles에 파일 보관 기한입니다. 기한을 넘어가면, 로그 파일이 삭제됩니다.
    }),
    new winstonDaily({
      level: "error", 
      datePattern: "YYYY-MM-DD",
      dirname: logDir, 
      filename: "%DATE%.error.log",
      maxSize: "20m",
      maxFiles: "30d", 
    }),
  ],
});


// 개발 환경에서 터미널에서 출력
if (process.env.NODE_ENV === "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(), // colorize는 로그의 색상입니다.
        winston.format.simple() 
      ),
    })
  );
}

export default logger;