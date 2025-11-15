using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backendAPI.Migrations
{
    /// <inheritdoc />
    public partial class InitAanvoerderItems : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "KoperId",
                table: "AanvoerItems");

            migrationBuilder.AlterColumn<decimal>(
                name: "Opbrengst",
                table: "AanvoerItems",
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

            migrationBuilder.AddColumn<string>(
                name: "Naam_Product",
                table: "AanvoerItems",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Naam_Product",
                table: "AanvoerItems");

            migrationBuilder.AlterColumn<decimal>(
                name: "Opbrengst",
                table: "AanvoerItems",
                type: "decimal(10,2)",
                precision: 10,
                scale: 2,
                nullable: true,
                oldClrType: typeof(decimal),
                oldType: "decimal(10,2)",
                oldPrecision: 10,
                oldScale: 2);

            migrationBuilder.AddColumn<int>(
                name: "KoperId",
                table: "AanvoerItems",
                type: "int",
                nullable: true);
        }
    }
}
