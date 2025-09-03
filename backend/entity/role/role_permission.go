package entity

import "gorm.io/gorm"

type RolePermission struct {
	gorm.Model

	RoleID *uint
	Role   Role `gorm:"foreignKey:RoleID"`

	PermissionID *uint
	Permission   Permission `gorm:"foreignKey:PermissionID"`
}