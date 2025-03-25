export const toSlug = (name) => {
    return name
      .toLowerCase() // Chuyển sang chữ thường
      .replace(/[^a-z0-9\s-]/g, "") // Loại bỏ ký tự đặc biệt
      .replace(/\s+/g, "-") // Thay khoảng trắng bằng gạch ngang
      .replace(/-+/g, "-"); // Loại bỏ gạch ngang lặp lại
  };
  