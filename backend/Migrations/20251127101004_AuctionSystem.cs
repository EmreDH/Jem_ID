using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backendAPI.Migrations
{
    /// <inheritdoc />
    public partial class AuctionSystem : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AuctionItems_AanvoerItems_AanvoerderItemId",
                table: "AuctionItems");

            migrationBuilder.DropForeignKey(
                name: "FK_AuctionItems_Users_BuyerId",
                table: "AuctionItems");

            migrationBuilder.DropForeignKey(
                name: "FK_AuctionItems_Users_CurrentLeaderId",
                table: "AuctionItems");

            migrationBuilder.DropIndex(
                name: "IX_AuctionItems_BuyerId",
                table: "AuctionItems");

            migrationBuilder.DropIndex(
                name: "IX_AuctionItems_CurrentLeaderId",
                table: "AuctionItems");

            migrationBuilder.DropColumn(
                name: "BuyerId",
                table: "AuctionItems");

            migrationBuilder.DropColumn(
                name: "CurrentLeaderId",
                table: "AuctionItems");

            migrationBuilder.RenameColumn(
                name: "IsClosed",
                table: "AuctionItems",
                newName: "IsFinished");

            migrationBuilder.RenameColumn(
                name: "AanvoerderItemId",
                table: "AuctionItems",
                newName: "AanvoerItemId");

            migrationBuilder.RenameIndex(
                name: "IX_AuctionItems_AanvoerderItemId",
                table: "AuctionItems",
                newName: "IX_AuctionItems_AanvoerItemId");

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

            migrationBuilder.AddColumn<decimal>(
                name: "StartPrice",
                table: "AuctionItems",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddForeignKey(
                name: "FK_AuctionItems_AanvoerItems_AanvoerItemId",
                table: "AuctionItems",
                column: "AanvoerItemId",
                principalTable: "AanvoerItems",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AuctionItems_AanvoerItems_AanvoerItemId",
                table: "AuctionItems");

            migrationBuilder.DropColumn(
                name: "StartPrice",
                table: "AuctionItems");

            migrationBuilder.RenameColumn(
                name: "IsFinished",
                table: "AuctionItems",
                newName: "IsClosed");

            migrationBuilder.RenameColumn(
                name: "AanvoerItemId",
                table: "AuctionItems",
                newName: "AanvoerderItemId");

            migrationBuilder.RenameIndex(
                name: "IX_AuctionItems_AanvoerItemId",
                table: "AuctionItems",
                newName: "IX_AuctionItems_AanvoerderItemId");

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

            migrationBuilder.AddColumn<int>(
                name: "BuyerId",
                table: "AuctionItems",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "CurrentLeaderId",
                table: "AuctionItems",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_AuctionItems_BuyerId",
                table: "AuctionItems",
                column: "BuyerId");

            migrationBuilder.CreateIndex(
                name: "IX_AuctionItems_CurrentLeaderId",
                table: "AuctionItems",
                column: "CurrentLeaderId");

            migrationBuilder.AddForeignKey(
                name: "FK_AuctionItems_AanvoerItems_AanvoerderItemId",
                table: "AuctionItems",
                column: "AanvoerderItemId",
                principalTable: "AanvoerItems",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_AuctionItems_Users_BuyerId",
                table: "AuctionItems",
                column: "BuyerId",
                principalTable: "Users",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_AuctionItems_Users_CurrentLeaderId",
                table: "AuctionItems",
                column: "CurrentLeaderId",
                principalTable: "Users",
                principalColumn: "Id");
        }
    }
}
