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
        isActive: true,
      },
    })
  )
    return { success: false, message: "Email sudah terdaftar" };

  const user = await prisma.user.create({
    data: {
      email,
      passwordHash: hashedPass,
      username: email.split("@")[0],

      roleMaps: {
        create: {
          // userId: user.id,
          roleId: 4,
        },
      },
    },

    select: {
      id: true,
      email: true,
      username: true,
      roleMaps: true,
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
      isActive: true,
    },
    select: {
      id: true,
      email: true,
      username: true,
      passwordHash: true,
      roleMaps: true,
    },
  });

  if (!user) {
    return { success: false, message: "Email tidak terdaftar" };
  }

  const isMatch = await bcrypt.compare(password, user.passwordHash);

  if (!isMatch) {
    return { success: false, message: "Password salah" };
  }

  delete user.passwordHash;

  const token = generateToken({
    id: user.id,
    email: user.email,
    roleMaps: user.roleMaps,
    username: user.username,
  });

  return {
    success: true,
    user,
    accessToken: token,
  };
}

export default { registerUser, loginUser };
