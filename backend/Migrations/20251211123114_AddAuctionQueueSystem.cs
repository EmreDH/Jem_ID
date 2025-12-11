using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backendAPI.Migrations
{
    /// <inheritdoc />
    public partial class AddAuctionQueueSystem : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_AuctionItems_EndTimeUtc",
                table: "AuctionItems");

            migrationBuilder.AlterColumn<DateTime>(
                name: "StartTimeUtc",
                table: "AuctionItems",
                type: "datetime2",
                nullable: true,
                oldClrType: typeof(DateTime),
                oldType: "datetime2");

            migrationBuilder.AlterColumn<decimal>(
                name: "StartPrice",
                table: "AuctionItems",
                type: "decimal(10,2)",
                precision: 10,
                scale: 2,
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "decimal(18,2)");

            migrationBuilder.AlterColumn<decimal>(
                name: "FinalPrice",
                table: "AuctionItems",
                type: "decimal(10,2)",
                precision: 10,
                scale: 2,
                nullable: true,
                oldClrType: typeof(decimal),
                oldType: "decimal(10,2)",
                oldPrecision: 10,
                oldScale: 2);

            migrationBuilder.AlterColumn<DateTime>(
                name: "EndTimeUtc",
                table: "AuctionItems",
                type: "datetime2",
                nullable: true,
                oldClrType: typeof(DateTime),
                oldType: "datetime2");

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedAtUtc",
                table: "AuctionItems",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<int>(
                name: "GewensteKlokLocatie",
                table: "AuctionItems",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "QueuePosition",
                table: "AuctionItems",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "Status",
                table: "AuctionItems",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "WinnerId",
                table: "AuctionItems",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "WinnerName",
                table: "AuctionItems",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_AuctionItems_QueuePosition",
                table: "AuctionItems",
                column: "QueuePosition");

            migrationBuilder.CreateIndex(
                name: "IX_AuctionItems_Status",
                table: "AuctionItems",
                column: "Status");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_AuctionItems_QueuePosition",
                table: "AuctionItems");

            migrationBuilder.DropIndex(
                name: "IX_AuctionItems_Status",
                table: "AuctionItems");

            migrationBuilder.DropColumn(
                name: "CreatedAtUtc",
                table: "AuctionItems");

            migrationBuilder.DropColumn(
                name: "GewensteKlokLocatie",
                table: "AuctionItems");

            migrationBuilder.DropColumn(
                name: "QueuePosition",
                table: "AuctionItems");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "AuctionItems");

            migrationBuilder.DropColumn(
                name: "WinnerId",
                table: "AuctionItems");

            migrationBuilder.DropColumn(
                name: "WinnerName",
                table: "AuctionItems");

            migrationBuilder.AlterColumn<DateTime>(
                name: "StartTimeUtc",
                table: "AuctionItems",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldNullable: true);

            migrationBuilder.AlterColumn<decimal>(
                name: "StartPrice",
                table: "AuctionItems",
                type: "decimal(18,2)",
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "decimal(10,2)",
                oldPrecision: 10,
                oldScale: 2);

            migrationBuilder.AlterColumn<decimal>(
                name: "FinalPrice",
                table: "AuctionItems",
                type: "decimal(10,2)",
                precision: 10,
                scale: 2,
                nullable: false,
                defaultValue: 0m,
                oldClrType: typeof(decimal),
                oldType: "decimal(10,2)",
                oldPrecision: 10,
                oldScale: 2,
                oldNullable: true);

            migrationBuilder.AlterColumn<DateTime>(
                name: "EndTimeUtc",
                table: "AuctionItems",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_AuctionItems_EndTimeUtc",
                table: "AuctionItems",
                column: "EndTimeUtc");
        }
    }
}
