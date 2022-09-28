import service from "../http";

export function getUser(params: object) {
    return service.post('/api/getUserInfo', params)
}
function greet({greeting:string,duration: number}){

}
greet({
  greeting: "hello world",
  duration: 4000,
});