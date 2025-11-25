export const emailRegex = (email)=>{
    const reg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    return reg.test(email);
}
export const passwordRegex = (pass)=>{
    // osiem znaków, jedna litera, jedna cyfra i jeden znak specjalny
    const reg = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

    return reg.test(pass);
}