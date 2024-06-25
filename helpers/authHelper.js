import bcrypt from 'bcrypt';

export const hashPassword = async(password)=>{
    try{
        const saltRounds=10;
        const hashedPassword= await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    }
    catch(err){
        console.log(err);
    }
};

// export const comparePassword = async (password, hashedPassword)=>{
//     return bcrypt.compare(password, hashedPassword);
// };


// import bcrypt from 'bcrypt';

// Function to compare plaintext password (or OTP) with hashed password (or OTP)
export const comparePassword = async (password, hashedPassword) => {
    try {
        // Use bcrypt.compare to compare plaintext with hashed password
        const isMatch = await bcrypt.compare(password, hashedPassword);
        return isMatch; // Returns true if passwords match, false otherwise
    } catch (error) {
        throw new Error('Comparison error: ' + error.message);
    }
};
