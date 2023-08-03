import * as fs from "fs";
import { parse } from "csv-parse/sync";

const csvData = fs.readFileSync("user.csv");
const records = parse(csvData);

// csvデータをオブジェクト化する
const keyList = records[0];
const csvObjList = records
  .filter((_, index) => index !== 0)
  .map((line) => {
    const tmpObj = {};
    keyList.map((key, index) => (tmpObj[key] = line[index]));
    return tmpObj;
  });

// オブジェクトからjsonを生成する
const jsonObj = [];
let oldBelongingId = "";
let belongingIndex = -1;

csvObjList.forEach((data, index) => {
  if (oldBelongingId !== data.id) {
    jsonObj.push({ id: data.id, user_id: [] });
    belongingIndex++;
  }
  jsonObj[belongingIndex].user_id.push(Number(data.user_id));
  oldBelongingId = data.id;
});

const json = JSON.stringify(jsonObj);
fs.writeFileSync("output.json", json);
// データ確認用に出力
console.log(json);
