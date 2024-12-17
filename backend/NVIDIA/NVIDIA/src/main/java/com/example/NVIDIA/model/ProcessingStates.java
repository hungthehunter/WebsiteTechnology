package com.example.NVIDIA.model;

public enum ProcessingStates {

//	Đang chờ người mua hoặc người bán xác nhận
	Pending, 
	
//  Người dùng xác nhận và bạn đóng gói gửi
	InProgress,
	
//  Bạn giao laptop và nhận tiền
	Completed,
	
//  Nếu người mua đổi ý không mua nữa
	Canceled,
}
