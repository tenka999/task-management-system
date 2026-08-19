import { generateToken } from "../utils/jwt.js";
import bcrypt from "bcrypt";
import { prisma } from "../lib/prisma.ts";

async function registerUser(email, password, confirmPassword) {
  if (password !== confirmPassword) {
    return {
      success: false,
      message: "Password dan confirm password tidak sama",
    };
  }
  const hashedPass = await bcrypt.hash(password, 10);
  console.log(hashedPass, "hashedPass");

  if (
    await prisma.user.findUnique({
      where: {
        email: email,
      },
    })
  )
    return { success: false, message: "Email sudah terdaftar" };

  const user = await prisma.user.create({
    data: {
      email: email,
      passwordHash: hashedPass,
      username: email.split("@")[0],
    },
    select: {
      id: true,
      email: true,
      username: true,
    },
  });
  return user;
}
async function loginUser(email, password) {
  if (!email || !password) {
    return { success: false, message: "Semua field harus diisi" };
  }

  const user = await prisma.user.findUnique({
    where: {
      email,
      deletedAt: null,
    },
  });

  if (!user) {
    return { success: false, message: "Email tidak terdaftar" };
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return { success: false, message: "Password salah" };
  }

  delete user.password;

  const token = generateToken({
    id: user.id,
    email: user.email,
    role: user.role,
    nama: user.nama,
  });

  return {
    success: true,
    user,
    accessToken: token,
  };
}

export default { registerUser, loginUser };
