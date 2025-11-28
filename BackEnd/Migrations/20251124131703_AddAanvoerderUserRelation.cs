using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backendAPI.Migrations
{
    /// <inheritdoc />
    public partial class AddAanvoerderUserRelation : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AuctionItems_AanvoerItems_AanvoerItemId",
                table: "AuctionItems");

            migrationBuilder.RenameColumn(
                name: "AanvoerItemId",
                table: "AuctionItems",
                newName: "AanvoerderItemId");

            migrationBuilder.RenameIndex(
                name: "IX_AuctionItems_AanvoerItemId",
                table: "AuctionItems",
                newName: "IX_AuctionItems_AanvoerderItemId");

            migrationBuilder.RenameColumn(
                name: "GewensteKloklocatie",
                table: "AanvoerItems",
                newName: "GewensteKlokLocatie");

            migrationBuilder.AlterColumn<string>(
                name: "Naam_Product",
                table: "AanvoerItems",
                type: "nvarchar(200)",
                maxLength: 200,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "GewensteKlokLocatie",
                table: "AanvoerItems",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(20)",
                oldMaxLength: 20);

            migrationBuilder.AlterColumn<string>(
                name: "FotoUrl",
                table: "AanvoerItems",
                type: "nvarchar(500)",
                maxLength: 500,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(255)",
                oldMaxLength: 255);

            migrationBuilder.AddForeignKey(
                name: "FK_AuctionItems_AanvoerItems_AanvoerderItemId",
                table: "AuctionItems",
                column: "AanvoerderItemId",
                principalTable: "AanvoerItems",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AuctionItems_AanvoerItems_AanvoerderItemId",
                table: "AuctionItems");

            migrationBuilder.RenameColumn(
                name: "AanvoerderItemId",
                table: "AuctionItems",
                newName: "AanvoerItemId");

            migrationBuilder.RenameIndex(
                name: "IX_AuctionItems_AanvoerderItemId",
                table: "AuctionItems",
                newName: "IX_AuctionItems_AanvoerItemId");

            migrationBuilder.RenameColumn(
                name: "GewensteKlokLocatie",
                table: "AanvoerItems",
                newName: "GewensteKloklocatie");

            migrationBuilder.AlterColumn<string>(
                name: "Naam_Product",
                table: "AanvoerItems",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(200)",
                oldMaxLength: 200);

            migrationBuilder.AlterColumn<string>(
                name: "GewensteKloklocatie",
                table: "AanvoerItems",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(50)",
                oldMaxLength: 50);

            migrationBuilder.AlterColumn<string>(
                name: "FotoUrl",
                table: "AanvoerItems",
                type: "nvarchar(255)",
                maxLength: 255,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(500)",
                oldMaxLength: 500);

            migrationBuilder.AddForeignKey(
                name: "FK_AuctionItems_AanvoerItems_AanvoerItemId",
                table: "AuctionItems",
                column: "AanvoerItemId",
                principalTable: "AanvoerItems",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
